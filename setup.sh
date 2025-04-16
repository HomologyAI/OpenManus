#!/bin/bash

# Update system
sudo yum update -y || sudo apt-get update

# Install Python and Node.js
sudo yum install -y python3 python3-pip nodejs npm || sudo apt-get install -y python3 python3-pip nodejs npm

# Install nginx
sudo yum install -y nginx || sudo apt-get install -y nginx

# Create directory for the app
mkdir -p /home/ec2-user/openmanus
cd /home/ec2-user/openmanus

# Clone your repository (replace with your repo URL)
# git clone <your-repo-url> .

# Setup Backend
pip3 install -r requirements.txt

# Setup Frontend
cd ui
npm install
npm run build

# Configure nginx
sudo tee /etc/nginx/conf.d/openmanus.conf << EOF
server {
    listen 80;
    server_name _;

    # Serve frontend
    location / {
        root /home/ec2-user/openmanus/ui/build;
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy backend requests
    location /api {
        proxy_pass http://127.0.0.1:8009;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# Remove default nginx config
sudo rm -f /etc/nginx/conf.d/default.conf

# Start services
sudo systemctl start nginx
sudo systemctl enable nginx

# Create systemd service for backend
sudo tee /etc/systemd/system/openmanus.service << EOF
[Unit]
Description=OpenManus Backend Service
After=network.target

[Service]
User=ec2-user
WorkingDirectory=/home/ec2-user/openmanus
Environment="PATH=/home/ec2-user/.local/bin:/usr/local/bin:/usr/bin:/bin"
ExecStart=/usr/local/bin/gunicorn --bind 127.0.0.1:8009 flask_app:app
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Start and enable backend service
sudo systemctl start openmanus
sudo systemctl enable openmanus
