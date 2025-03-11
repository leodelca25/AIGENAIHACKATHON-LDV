#AppSheet Template avaliable

https://www.appsheet.com/start/b5d2eba3-2b40-416c-8669-b522a8e7141f#appName=ReadUrine-358188198&group=%5B%5D&page=deck&sort=%5B%7B%22Column%22%3A%22createdon%22%2C%22Order%22%3A%22Descending%22%7D%5D&table=Inventory&view=Take+Stand

# Color Detection API - Google Cloud Run

This is a simple API that detects dominant colors in images using Google Vision API and is designed to be deployed on **Google Cloud Run**.

## Features
- Accepts base64-encoded images
- Extracts dominant colors from the image
- Returns colors in RGB format with their relevance score
- Secure API key handling using environment variables
- Fully compatible with **Google Cloud Run**

---

## 📌 Setup and Deployment

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR_USERNAME/color-detection-api.git
cd color-detection-api
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```sh
VISION_API_KEY=your_google_vision_api_key
PORT=8080
```
Alternatively, copy the provided example file:
```sh
cp .env.example .env
```

### **4️⃣ Run Locally**
```sh
npm start
```

---

## 📌 Deployment on Google Cloud Run

### **1️⃣ Authenticate with Google Cloud**
```sh
gcloud auth login
```

### **2️⃣ Set your Google Cloud project**
```sh
gcloud config set project [YOUR_PROJECT_ID]
```

### **3️⃣ Build and push the container**
```sh
gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/color-detection-service
```

### **4️⃣ Deploy to Cloud Run**
```sh
gcloud run deploy color-detection-service \
  --image gcr.io/[YOUR_PROJECT_ID]/color-detection-service \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 📌 API Usage

### **Endpoint:** `POST /detect-colors`
**Request Body:**
```json
{
  "imageBase64": "your_base64_encoded_image"
}
```

**Response Example:**
```json
{
  "success": true,
  "colors": [
    {
      "color": "rgb(230, 25, 50)",
      "red": 230,
      "green": 25,
      "blue": 50,
      "score": 0.85
    },
    {
      "color": "rgb(10, 200, 100)",
      "red": 10,
      "green": 200,
      "blue": 100,
      "score": 0.75
    }
  ]
}
```

---

## 📌 Additional Commands
### **Run Locally with Docker**
```sh
docker build -t color-detection .
docker run -p 8080:8080 --env-file .env color-detection
```

### **Test API with `curl`**
```sh
curl -X POST [CLOUD_RUN_URL]/detect-colors \
-H "Content-Type: application/json" \
-d '{
  "imageBase64": "your_base64_image_data"
}'
```

---

## 📌 License
This project is licensed under the MIT License.
