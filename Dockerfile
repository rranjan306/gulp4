############################################################
# Dockerfile to build Lovelace App UI
#############################################################

# Pull base image.
FROM nginx:1.10.2-alpine

# Copy build
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html/
