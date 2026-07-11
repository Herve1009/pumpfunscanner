#!/bin/bash

DOMAIN=$1

echo "🚀 Installing Nginx..."

apt update -y
apt install nginx -y

echo "⚙️ Creating Nginx config..."

cat > /etc/nginx/sites-available/pump-scanner <<EOL
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location /api {
        proxy_pass http://localhost:3000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
    }

    location /socket.io {
        proxy_pass http://localhost:3000/socket.io;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
    }

    location / {
        root /var/www/pump-dashboard;
        index index.html;
        try_files \$uri \$uri/ =404;
    }
}
EOL

echo "🔗 Enabling site..."

ln -s /etc/nginx/sites-available/pump-scanner /etc/nginx/sites-enabled/

nginx -t

systemctl restart nginx

echo "🔐 Installing SSL (Let's Encrypt)..."

apt install certbot python3-certbot-nginx -y

certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN

echo "✅ DONE: Nginx + SSL installed for $DOMAIN"
