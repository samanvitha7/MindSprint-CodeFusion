# Instructions for copying your trained model to the FastAPI backend

Based on your Jupyter notebook training, you should copy one of these model files:

## Option 1: Use the Balanced Model (RECOMMENDED)
Copy this file from your notebook directory:
```
saved_models/waste_classifier_balanced.h5
```
To:
```
s:\MindSprint\MindSprint-CodeFusion\ml-backend\model\waste_classifier_balanced.h5
```

## Option 2: Use the Original Model
Copy this file from your notebook directory:
```
saved_models/waste_classifier_original.h5
```
To:
```
s:\MindSprint\MindSprint-CodeFusion\ml-backend\model\waste_classifier.h5
```

## Model Performance Comparison from your notebook:
- **Balanced Model**: Better performance on biodegradable class
- **Original Model**: Good overall accuracy but biased toward non-biodegradable

## After copying the model file:
1. Restart your FastAPI server: `uvicorn main:app --reload`
2. Check the logs to see which model was loaded
3. Test with different images to verify accuracy

## Model Details:
- **Input**: 224x224 RGB images
- **Preprocessing**: ResNet50 preprocess_input (not simple normalization)
- **Output**: Single sigmoid value (0 = biodegradable, 1 = non-biodegradable)
- **Architecture**: ResNet50 transfer learning with custom head
