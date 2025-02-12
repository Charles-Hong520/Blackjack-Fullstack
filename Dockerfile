FROM python:3.9-slim
WORKDIR /src/server
COPY /server /src/server

RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["python", "app.py"]
