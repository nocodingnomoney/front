FROM nginx:1.16-alpine

WORKDIR /usr/local/nginx/html

COPY . /usr/local/nginx/html/ncnm

# 还需要shell脚本使nginx生效