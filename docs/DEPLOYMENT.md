# Deployment and Operations Guide

## Table of Contents

- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [Testing Deployment](#testing-deployment)
- [Production Deployment](#production-deployment)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)

## Quick Start

### Prerequisites

- **Node.js**: Version 20+ (LTS recommended)
- **Docker**: Version 20.10+ with Docker Compose
- **Git**: Latest version
- **MySQL**: 8.0+ (if running locally)

### 1-Minute Setup

```bash
# Clone the repository
git clone https://github.com/APorkolab/Miserere-Mei.git
cd Miserere-Mei

# Start with Docker Compose (recommended)
docker-compose -f docker-compose.dev.yml up -d

# Access the application
# Frontend: http://localhost:4200
# Backend API: http://localhost:3000
# MailHog (dev email): http://localhost:8025
```

## Environment Setup

### Environment Variables

Create environment files for each environment:

#### `.env.development`

```env
# Database Configuration
DB_HOST=mysql
DB_PORT=3306
DB_NAME=miserere_dev
DB_USER=miserere
DB_PASSWORD=devpassword
DB_ROOT_PASSWORD=devpassword

# Application Configuration
NODE_ENV=development
PORT=3000
JWT_SECRET=dev-jwt-secret-key-please-change-in-production
JWT_EXPIRY=24h

# Redis Configuration
REDIS_HOST=redis-dev
REDIS_PORT=6379
REDIS_PASSWORD=

# Email Configuration (Development - MailHog)
SMTP_HOST=mailhog
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=noreply@miserere.local

# Logging
LOG_LEVEL=debug
LOG_DIR=./logs

# Security
CORS_ORIGIN=http://localhost:4200
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### `.env.production`

```env
# Database Configuration
DB_HOST=${DB_HOST}
DB_PORT=3306
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}

# Application Configuration
NODE_ENV=production
PORT=3000
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRY=1h

# Redis Configuration
REDIS_HOST=${REDIS_HOST}
REDIS_PORT=6379
REDIS_PASSWORD=${REDIS_PASSWORD}

# Email Configuration
SMTP_HOST=${SMTP_HOST}
SMTP_PORT=${SMTP_PORT}
SMTP_USER=${SMTP_USER}
SMTP_PASS=${SMTP_PASS}
EMAIL_FROM=${EMAIL_FROM}

# Logging
LOG_LEVEL=info
LOG_DIR=/var/log/app

# Security
CORS_ORIGIN=${FRONTEND_URL}
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring
HEALTH_CHECK_ENDPOINT=/health
METRICS_ENDPOINT=/metrics
```

## Local Development

### Method 1: Docker Compose (Recommended)

```bash
# Development environment with hot reload
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down

# Rebuild services
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Method 2: Manual Setup

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up database
mysql -u root -p -e "CREATE DATABASE miserere_dev;"

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build:prod
```

### Development Tools

#### Database Management

```bash
# Access MySQL container
docker exec -it miserere-mysql-dev mysql -u root -p

# Run database migrations
docker exec miserere-backend-dev npm run db:migrate

# Seed database with test data
docker exec miserere-backend-dev npm run db:seed
```

#### Debugging

```bash
# Backend debugging (Node.js inspector)
# Connect debugger to port 9229

# View application logs
docker-compose -f docker-compose.dev.yml logs backend-dev

# Monitor Redis
docker exec -it miserere-redis-dev redis-cli monitor
```

## Testing Deployment

### Automated Testing

```bash
# Run all tests
npm test

# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test

# Run E2E tests
npm run e2e

# Generate coverage report
npm run coverage
```

### Integration Testing

```bash
# Start test environment
docker-compose -f docker-compose.test.yml up -d

# Run integration tests
npm run test:integration

# Clean up test environment
docker-compose -f docker-compose.test.yml down -v
```

### Load Testing

```bash
# Install artillery (if not installed)
npm install -g artillery

# Run load tests
artillery run tests/load/api-load-test.yml
```

## Production Deployment

### Prerequisites for Production

- **Container Orchestration**: Kubernetes or Docker Swarm
- **Load Balancer**: Nginx, HAProxy, or cloud load balancer
- **Database**: MySQL 8.0 with proper backup strategy
- **Cache**: Redis cluster for high availability
- **Monitoring**: Prometheus, Grafana, or equivalent
- **SSL Certificate**: For HTTPS encryption

### Docker Production Deployment

#### 1. Build Production Images

```bash
# Build backend image
docker build -t ghcr.io/aporkolab/miserere-mei/backend:latest -f backend/Dockerfile backend/

# Build frontend image
docker build -t ghcr.io/aporkolab/miserere-mei/frontend:latest -f frontend/Dockerfile frontend/

# Push to registry
docker push ghcr.io/aporkolab/miserere-mei/backend:latest
docker push ghcr.io/aporkolab/miserere-mei/frontend:latest
```

#### 2. Deploy with Docker Compose

```bash
# Set production environment variables
export DB_PASSWORD=$(openssl rand -base64 32)
export JWT_SECRET=$(openssl rand -base64 64)
export REDIS_PASSWORD=$(openssl rand -base64 32)

# Deploy production stack
docker-compose -f docker-compose.yml up -d

# Check service health
docker-compose -f docker-compose.yml ps
docker-compose -f docker-compose.yml logs
```

### Kubernetes Deployment

#### 1. Create Kubernetes Manifests

##### `k8s/namespace.yml`

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: miserere-mei
  labels:
    name: miserere-mei
```

##### `k8s/configmap.yml`

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: miserere-mei
data:
  NODE_ENV: 'production'
  LOG_LEVEL: 'info'
  DB_HOST: 'mysql-service'
  REDIS_HOST: 'redis-service'
```

##### `k8s/mysql-deployment.yml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-deployment
  namespace: miserere-mei
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql:8.0
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: root-password
            - name: MYSQL_DATABASE
              value: 'miserere_mei'
          ports:
            - containerPort: 3306
          volumeMounts:
            - name: mysql-storage
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-storage
          persistentVolumeClaim:
            claimName: mysql-pvc
```

#### 2. Deploy to Kubernetes

```bash
# Create namespace
kubectl apply -f k8s/namespace.yml

# Create secrets
kubectl create secret generic mysql-secret \
  --from-literal=root-password=$(openssl rand -base64 32) \
  -n miserere-mei

kubectl create secret generic app-secret \
  --from-literal=jwt-secret=$(openssl rand -base64 64) \
  -n miserere-mei

# Deploy all resources
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n miserere-mei
kubectl get services -n miserere-mei
```

### Cloud Deployment (AWS Example)

#### Infrastructure as Code (Terraform)

```hcl
# main.tf
provider "aws" {
  region = var.aws_region
}

# ECS Cluster
resource "aws_ecs_cluster" "miserere_cluster" {
  name = "miserere-mei"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# Application Load Balancer
resource "aws_lb" "app_lb" {
  name               = "miserere-mei-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb_sg.id]
  subnets           = var.public_subnet_ids

  enable_deletion_protection = true
}

# RDS MySQL Instance
resource "aws_db_instance" "mysql" {
  identifier = "miserere-mei-db"

  engine         = "mysql"
  engine_version = "8.0"
  instance_class = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_encrypted     = true

  db_name  = "miserere_mei"
  username = "admin"
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.default.name

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  skip_final_snapshot = false
  final_snapshot_identifier = "miserere-mei-final-snapshot"
}
```

## Monitoring and Maintenance

### Health Checks

#### Application Health Endpoints

```javascript
// Backend health check (Express.js)
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      memory: process.memoryUsage(),
      uptime: process.uptime(),
    },
  };

  const isHealthy = Object.values(health.services).every(
    service => service.status === 'healthy'
  );

  res.status(isHealthy ? 200 : 503).json(health);
});
```

#### Container Health Checks

```dockerfile
# In backend Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
```

### Monitoring Setup

#### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'miserere-mei-backend'
    static_configs:
      - targets: ['backend:3000']
    metrics_path: /metrics
    scrape_interval: 15s

  - job_name: 'miserere-mei-mysql'
    static_configs:
      - targets: ['mysql-exporter:9104']

  - job_name: 'miserere-mei-redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

#### Grafana Dashboard

Key metrics to monitor:

- **Application Metrics**: Response times, error rates, throughput
- **System Metrics**: CPU, memory, disk usage
- **Database Metrics**: Connection pool, query performance
- **Cache Metrics**: Hit/miss rates, memory usage

### Logging Strategy

#### Structured Logging (Backend)

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});
```

### Backup and Recovery

#### Database Backup

```bash
# Automated MySQL backup script
#!/bin/bash
DB_NAME="miserere_mei"
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
mysqldump -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} ${DB_NAME} | \
gzip > ${BACKUP_DIR}/${DB_NAME}_${DATE}.sql.gz

# Retain only last 7 days of backups
find ${BACKUP_DIR} -name "${DB_NAME}_*.sql.gz" -mtime +7 -delete
```

#### Disaster Recovery Plan

1. **RTO (Recovery Time Objective)**: 1 hour
2. **RPO (Recovery Point Objective)**: 15 minutes
3. **Backup Strategy**: Daily full backups, 15-minute incremental
4. **Recovery Testing**: Monthly disaster recovery drills

## Troubleshooting

### Common Issues

#### 1. Application Won't Start

```bash
# Check container logs
docker-compose logs backend frontend

# Check system resources
docker system df
docker system prune

# Verify environment variables
docker exec <container> env | grep -E "(DB_|JWT_|REDIS_)"
```

#### 2. Database Connection Issues

```bash
# Test database connectivity
docker exec miserere-backend-dev npm run db:test-connection

# Check MySQL logs
docker logs miserere-mysql

# Verify database exists
docker exec -it miserere-mysql mysql -u root -p -e "SHOW DATABASES;"
```

#### 3. Performance Issues

```bash
# Check resource usage
docker stats

# Analyze slow queries (MySQL)
docker exec -it miserere-mysql mysql -u root -p -e "
  SELECT query_time, lock_time, sql_text
  FROM mysql.slow_log
  ORDER BY query_time DESC
  LIMIT 10;"

# Monitor Redis performance
docker exec -it miserere-redis redis-cli --latency-history
```

### Log Analysis

#### Finding Common Errors

```bash
# Backend errors
docker-compose logs backend | grep -i error | tail -20

# Database errors
docker-compose logs mysql | grep -i error

# Frontend console errors (check browser dev tools)
# Network errors
docker-compose logs nginx | grep -E "(4[0-9]{2}|5[0-9]{2})"
```

### Performance Tuning

#### MySQL Optimization

```sql
-- Check slow queries
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Optimize tables
OPTIMIZE TABLE users, locations, characters, game_sessions;

-- Add indexes for frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_characters_user_id ON characters(user_id);
CREATE INDEX idx_game_sessions_user_id ON game_sessions(user_id);
```

#### Redis Configuration

```conf
# redis.conf optimizations
maxmemory 256mb
maxmemory-policy allkeys-lru
tcp-keepalive 60
timeout 300
```

## Security Considerations

### Production Security Checklist

- [ ] **Environment Variables**: All secrets stored securely
- [ ] **HTTPS**: SSL certificates configured and valid
- [ ] **Database**: Connection encrypted, limited user permissions
- [ ] **API**: Rate limiting and input validation enabled
- [ ] **CORS**: Properly configured for frontend domain only
- [ ] **Headers**: Security headers enabled (CSP, HSTS, etc.)
- [ ] **Monitoring**: Security event logging and alerting
- [ ] **Updates**: Regular security updates applied
- [ ] **Backups**: Encrypted and tested backup strategy
- [ ] **Access**: Principle of least privilege applied

### Security Monitoring

```bash
# Monitor failed login attempts
grep "authentication failed" /var/log/app/combined.log

# Check for suspicious API calls
grep -E "(admin|delete)" /var/log/nginx/access.log | grep -v "200\|201"

# Monitor resource usage spikes
watch -n 5 'docker stats --no-stream'
```

---

_This deployment guide should be regularly updated to reflect changes in
infrastructure, security practices, and operational procedures._
