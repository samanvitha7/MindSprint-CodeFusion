# Biodegradable Waste Classification System - MERN + FastAPI

A full-stack biodegradable waste classification system that uses a CNN model to determine if waste materials are biodegradable or non-biodegradable. The system consists of:

- **Frontend**: React.js application for image upload and results display
- **Backend**: Node.js/Express server that handles API requests
- **ML Backend**: FastAPI server that serves the CNN model for image classification

## 🏗️ Architecture

```
Frontend (React)  →  Backend (Node.js)  →  ML Backend (FastAPI + CNN Model)
     ↓                      ↓                         ↓
Port 3000             Port 5000                  Port 8000
```

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB (for future data storage)
- Your trained Keras model (.h5 file)

## 🚀 Setup Instructions

### 1. Clone and Navigate
```bash
cd s:\MindSprint\MindSprint-CodeFusion
```

### 2. Setup ML Backend (FastAPI)

```bash
cd ml-backend

# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Place your trained model
# Copy your trained Keras model (.h5 file) to ml-backend/model/
# Rename it to 'waste_classifier.h5' or update the path in main.py
```

### 3. Setup Node.js Backend

```bash
cd ../backend

# Install dependencies
npm install

# Create .env file (optional)
echo "MONGO_URI=mongodb://localhost:27017/waste-classifier" > .env
echo "PORT=5000" >> .env
```

### 4. Setup React Frontend

```bash
cd ../frontend

# Install dependencies
npm install
```

## 🏃‍♂️ Running the Application

You need to start all three services:

### 1. Start ML Backend (Terminal 1)
```bash
cd ml-backend
# Activate virtual environment if created
venv\Scripts\activate
# Start FastAPI server
uvicorn main:app --reload --host localhost --port 8000
```

### 2. Start Node.js Backend (Terminal 2)
```bash
cd backend
npm start
```

### 3. Start React Frontend (Terminal 3)
```bash
cd frontend
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Node.js Backend**: http://localhost:5000
- **FastAPI ML Backend**: http://localhost:8000
- **FastAPI Docs**: http://localhost:8000/docs

## 📝 API Endpoints

### Node.js Backend (`http://localhost:5000`)
- `GET /` - Health check
- `POST /api/predict` - Upload image for classification
- `GET /api/health` - Service health status

### FastAPI ML Backend (`http://localhost:8000`)
- `GET /` - Service info
- `GET /ping` - Health check
- `GET /classes` - Available waste classes
- `POST /predict` - Direct model prediction

## 🗂️ Waste Categories

The model classifies waste into these categories:
- **Biodegradable** - Organic waste that can decompose naturally
- **Non-Biodegradable** - Waste that cannot decompose naturally (plastic, metal, etc.)

## 🔧 Configuration

### Model Configuration
Update `ml-backend/main.py` if needed:
- Change model path in `load_model()` function if your model has a different filename
- The system is configured for binary classification (biodegradable vs non-biodegradable)
- Adjust image preprocessing in `preprocess_image()` function if your model requires different preprocessing

### Frontend Configuration
Update `frontend/src/components/WasteClassifier.js` if needed:
- Change backend URL if running on different ports
- Modify UI components as needed

## 🛠️ Troubleshooting

### Common Issues

1. **Model not loading**
   - Ensure your .h5 model file is in `ml-backend/model/`
   - Check the model path in `main.py`
   - Verify model compatibility with TensorFlow version

2. **CORS errors**
   - Ensure all three services are running
   - Check CORS configuration in both backends

3. **Image upload fails**
   - Verify file size limits (current: 10MB)
   - Ensure image format is supported (JPG, PNG, etc.)

4. **Connection refused errors**
   - Ensure all services are running on correct ports
   - Check firewall settings

### Port Configuration
If you need to change ports, update:
- FastAPI: `ml-backend/main.py` (uvicorn run command)
- Node.js: `backend/server.js` (PORT variable)
- React: `frontend/src/components/WasteClassifier.js` (axios URLs)

## 📊 Model Requirements

Your CNN model should:
- Accept RGB images (224x224 recommended)
- Output probabilities for binary classification (biodegradable vs non-biodegradable)
- Be saved in Keras .h5 format
- Use normalized input (0-1 pixel values)
- Support either single output (sigmoid) or dual output (softmax) architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
