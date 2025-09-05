from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from tensorflow.keras.applications.resnet50 import preprocess_input
import logging
import os

# Suppress TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
tf.get_logger().setLevel('ERROR')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Biodegradable Waste Classification API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],  # React and Node.js backends
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model and classes
MODEL = None
CLASS_NAMES = ["biodegradable", "non-biodegradable"]

def load_model():
    """Load the trained Keras model"""
    global MODEL
    try:
        # Try to load the balanced model first (better performance)
        model_paths = [
            "model/waste_classifier_balanced.h5",  # Balanced model (preferred)
            "model/waste_classifier.h5",           # Original model (fallback)
            "model/waste_classifier_original.h5"   # Alternative naming
        ]
        
        MODEL = None
        for model_path in model_paths:
            try:
                if os.path.exists(model_path):
                    MODEL = tf.keras.models.load_model(model_path, compile=False)
                    logger.info(f"Successfully loaded model from: {model_path}")
                    break
            except Exception as e:
                logger.warning(f"Failed to load {model_path}: {e}")
                continue
        
        if MODEL is None:
            raise Exception("No valid model file found")
        
        # Compile the model to suppress warnings and ensure proper configuration
        MODEL.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        
        logger.info("Biodegradable classification model loaded and compiled successfully")
        logger.info(f"Model input shape: {MODEL.input_shape}")
        logger.info(f"Model output shape: {MODEL.output_shape}")
        
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        MODEL = None

def preprocess_image(image: Image.Image) -> np.ndarray:
    """Preprocess image for model prediction - EXACTLY like training"""
    try:
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize image to model input size (same as training)
        image = image.resize((224, 224))
        
        # Convert to numpy array
        img_array = np.array(image)
        
        # Log original image stats for debugging
        logger.info(f"Original image shape: {img_array.shape}")
        logger.info(f"Original pixel range: {img_array.min()} - {img_array.max()}")
        
        # Add batch dimension BEFORE preprocessing (required by preprocess_input)
        img_batch = np.expand_dims(img_array, 0)
        
        # Use EXACT same preprocessing as training: ResNet50 preprocess_input
        # This converts RGB [0,255] to the format ResNet50 expects
        img_batch = preprocess_input(img_batch)
        
        # Log processed image stats
        logger.info(f"After ResNet50 preprocessing shape: {img_batch.shape}")
        logger.info(f"After ResNet50 preprocessing range: {img_batch.min():.3f} - {img_batch.max():.3f}")
        
        return img_batch
    except Exception as e:
        logger.error(f"Error preprocessing image: {e}")
        raise HTTPException(status_code=400, detail="Error processing image")

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    load_model()

@app.get("/")
async def root():
    return {"message": "Biodegradable Waste Classification API", "status": "running"}

@app.get("/ping")
async def ping():
    return {"message": "Hello, I am alive", "model_loaded": MODEL is not None}

@app.get("/classes")
async def get_classes():
    """Get available waste classes"""
    return {"classes": CLASS_NAMES, "description": "Binary classification: biodegradable vs non-biodegradable"}

@app.get("/model-info")
async def get_model_info():
    """Get model information for debugging"""
    if MODEL is None:
        return {"error": "Model not loaded"}
    
    return {
        "model_loaded": True,
        "input_shape": MODEL.input_shape,
        "output_shape": MODEL.output_shape,
        "model_summary": str(MODEL.summary()),
        "classes": CLASS_NAMES
    }

@app.get("/test-model")
async def test_model():
    """Test model with a dummy input"""
    if MODEL is None:
        return {"error": "Model not loaded"}
    
    try:
        # Create a dummy input (random image)
        dummy_input = np.random.rand(1, 224, 224, 3).astype(np.float32)
        predictions = MODEL.predict(dummy_input, verbose=0)
        
        return {
            "test_input_shape": dummy_input.shape,
            "predictions_shape": predictions.shape,
            "raw_predictions": predictions.tolist(),
            "prediction_value": float(predictions[0][0])
        }
        
    except Exception as e:
        return {"error": str(e)}

@app.post("/debug-predict")
async def debug_predict(file: UploadFile = File(...)):
    """Debug prediction with detailed logging"""
    if MODEL is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Read and preprocess image
        image_data = await file.read()
        image = read_file_as_image(image_data)
        img_batch = preprocess_image(image)
        
        # Make prediction with verbose output
        predictions = MODEL.predict(img_batch, verbose=1)
        
        return {
            "filename": file.filename,
            "input_shape": img_batch.shape,
            "output_shape": predictions.shape,
            "raw_predictions": predictions.tolist(),
            "model_input_shape": MODEL.input_shape,
            "model_output_shape": MODEL.output_shape
        }
        
    except Exception as e:
        logger.error(f"Debug prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def read_file_as_image(data) -> Image.Image:
    """Read uploaded file as PIL Image"""
    try:
        image = Image.open(BytesIO(data))
        return image
    except Exception as e:
        logger.error(f"Error reading image: {e}")
        raise HTTPException(status_code=400, detail="Invalid image file")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """Predict if waste is biodegradable or non-biodegradable"""
    
    # Check if model is loaded
    if MODEL is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please check server logs.")
    
    # Validate file type
    if not file.content_type or not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read and preprocess image
        image_data = await file.read()
        image = read_file_as_image(image_data)
        img_batch = preprocess_image(image)
        
        # Make prediction
        predictions = MODEL.predict(img_batch)
        
        # Log raw predictions for debugging
        logger.info(f"Raw predictions shape: {predictions.shape}")
        logger.info(f"Raw predictions values: {predictions}")
        
        # Handle binary classification based on output shape
        if len(predictions.shape) == 2 and predictions.shape[1] == 1:
            # Single output (sigmoid activation) - value between 0 and 1
            raw_confidence = float(predictions[0][0])
            
            # Based on your training setup:
            # - Values close to 0 = biodegradable (class 0)
            # - Values close to 1 = non-biodegradable (class 1)
            # This matches your flow_from_directory class_mode='binary' setup
            
            if raw_confidence > 0.5:
                predicted_class = CLASS_NAMES[1]  # non-biodegradable
                predicted_confidence = raw_confidence
            else:
                predicted_class = CLASS_NAMES[0]  # biodegradable  
                predicted_confidence = 1 - raw_confidence
            
            # Create probabilities for both classes
            class_probabilities = {
                CLASS_NAMES[0]: float(1 - raw_confidence),  # biodegradable probability
                CLASS_NAMES[1]: float(raw_confidence)       # non-biodegradable probability
            }
            
        elif len(predictions.shape) == 2 and predictions.shape[1] == 2:
            # Two outputs (softmax activation) - two probabilities that sum to 1
            predicted_class_index = np.argmax(predictions[0])
            predicted_class = CLASS_NAMES[predicted_class_index]
            predicted_confidence = float(np.max(predictions[0]))
            
            # Get all class probabilities
            class_probabilities = {
                CLASS_NAMES[0]: float(predictions[0][0]),  # biodegradable
                CLASS_NAMES[1]: float(predictions[0][1])   # non-biodegradable
            }
            
        else:
            # Unexpected output shape
            logger.error(f"Unexpected prediction shape: {predictions.shape}")
            raise HTTPException(status_code=500, detail=f"Unexpected model output shape: {predictions.shape}")
        
        logger.info(f"Prediction: {predicted_class}, Confidence: {predicted_confidence:.4f}")
        logger.info(f"All probabilities: {class_probabilities}")
        
        return {
            "success": True,
            "predicted_class": predicted_class,
            "confidence": predicted_confidence,
            "all_probabilities": class_probabilities,
            "filename": file.filename,
            "classification_type": "biodegradable_detection"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail="Error processing image for prediction")

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000, reload=True)
