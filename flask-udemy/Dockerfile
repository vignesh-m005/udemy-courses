FROM python:3.8
EXPOSE 5000
WORKDIR D:/OneDrive - MKS VISION PVT LTD/PROJECTS/udemy-courses/flask-udemy/app
COPY requirements.txt .
RUN pip install flask -r requirements.txt
COPY . .
CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]


#docker run -dp 5001:5000 -w /app -v "D:/OneDrive - MKS VISION PVT LTD/PROJECTS/udemy-cours
 #es/flask-udemy:/app" flask-smorest-api

# docker build -t flask-smorest-api .   