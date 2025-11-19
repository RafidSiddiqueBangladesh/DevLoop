# FoodSense Database Schema

This document outlines the planned database schema for the FoodSense platform. Currently, the API structure is prepared for future database implementation.

## Overview

The database will support:
- **Household user management** with profiles and preferences
- **Food inventory tracking** with expiration dates
- **Consumption logging** for analytics
- **Sustainability resources** management
- **IoT device integration** (Phase 2)
- **Farmer network** management (Phase 2)
- **Marketplace transactions** (Phase 2)

---

## Core Tables

### 1. Users Table

Stores household user information.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  household_size INT DEFAULT 1,
  dietary_preferences VARCHAR(255),
  location VARCHAR(255),
  monthly_budget INT DEFAULT 10000,
  language VARCHAR(10) DEFAULT 'en', -- 'en' or 'bn'
  user_type VARCHAR(50) DEFAULT 'household', -- 'household' or 'farmer'
  profile_picture_url TEXT,
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users(location);
```

### 2. Inventory Items Table

Tracks food items in user's inventory.

```sql
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  food_item_id VARCHAR(100), -- Reference to food_items seed data
  name_en VARCHAR(255) NOT NULL,
  name_bn VARCHAR(255),
  category VARCHAR(100) NOT NULL, -- vegetables, fruits, dairy, grains, meat, fish, eggs, legumes, spices, oils
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50) NOT NULL, -- kg, liters, pieces, etc.
  purchase_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  source VARCHAR(100), -- 'purchased', 'home-grown', 'received'
  storage_location VARCHAR(255),
  notes TEXT,
  cost_bdt INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_inventory_user_id ON inventory_items(user_id);
CREATE INDEX idx_inventory_expiration ON inventory_items(expiration_date);
CREATE INDEX idx_inventory_category ON inventory_items(category);
```

### 3. Food Logs Table

Records food consumption for analytics.

```sql
CREATE TABLE food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  inventory_item_id UUID REFERENCES inventory_items(id),
  food_name_en VARCHAR(255) NOT NULL,
  food_name_bn VARCHAR(255),
  quantity_consumed DECIMAL(10, 2),
  unit VARCHAR(50),
  category VARCHAR(100),
  log_date DATE NOT NULL,
  cost_bdt INT,
  waste_percentage INT DEFAULT 0, -- 0-100
  waste_type VARCHAR(100), -- 'spoiled', 'leftover', 'none'
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_food_logs_user_id ON food_logs(user_id);
CREATE INDEX idx_food_logs_date ON food_logs(log_date);
CREATE INDEX idx_food_logs_category ON food_logs(category);
```

### 4. Image Uploads Table

Stores uploaded receipts, labels, and food photos.

```sql
CREATE TABLE image_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  inventory_item_id UUID REFERENCES inventory_items(id),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT, -- in bytes
  mime_type VARCHAR(100),
  upload_type VARCHAR(100) NOT NULL, -- 'receipt', 'label', 'food-photo'
  description TEXT,
  ocr_text TEXT, -- Future: Extracted text from image
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_images_user_id ON image_uploads(user_id);
CREATE INDEX idx_images_upload_type ON image_uploads(upload_type);
CREATE INDEX idx_images_created_at ON image_uploads(created_at);
```

### 5. Resources Table

Sustainability resources (seed data + future community contributions).

```sql
CREATE TABLE resources (
  id VARCHAR(100) PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255),
  description_en TEXT,
  description_bn TEXT,
  content_en TEXT,
  content_bn TEXT,
  category VARCHAR(100), -- 'composting', 'waste-reduction', 'meal-planning', 'storage', 'budget-tips'
  resource_type VARCHAR(50), -- 'article', 'video', 'infographic'
  target_audience VARCHAR(100), -- 'household', 'farmer', 'community'
  tags TEXT[], -- PostgreSQL array
  external_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Indexes
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_type ON resources(resource_type);
```

---

## Phase 2 Tables (IoT & Farming)

### 6. IoT Devices Table

```sql
CREATE TABLE iot_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  device_name VARCHAR(255) NOT NULL,
  device_type VARCHAR(100), -- 'smart-scale', 'button-phone', 'sensor'
  device_id VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'inactive', -- 'active', 'inactive', 'offline'
  last_sync TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_iot_devices_user_id ON iot_devices(user_id);
CREATE INDEX idx_iot_devices_status ON iot_devices(status);
```

### 7. Farmers Table

```sql
CREATE TABLE farmers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  farm_name VARCHAR(255),
  farm_size DECIMAL(10, 2), -- in hectares
  farm_location VARCHAR(255),
  crop_types TEXT[], -- Array of crops
  organic_certified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_farmers_user_id ON farmers(user_id);
CREATE INDEX idx_farmers_location ON farmers(farm_location);
```

### 8. IoT Sensor Readings Table

```sql
CREATE TABLE iot_sensor_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES iot_devices(id),
  farmer_id UUID REFERENCES farmers(id),
  reading_type VARCHAR(100), -- 'soil-moisture', 'temperature', 'humidity'
  reading_value DECIMAL(10, 2),
  unit VARCHAR(50), -- '%', '°C', etc.
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_sensor_readings_device ON iot_sensor_readings(device_id);
CREATE INDEX idx_sensor_readings_farmer ON iot_sensor_readings(farmer_id);
CREATE INDEX idx_sensor_readings_timestamp ON iot_sensor_readings(timestamp);
```

---

## Phase 2 Tables (Marketplace)

### 9. Farmer Products Table

```sql
CREATE TABLE farmer_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES farmers(id),
  name_en VARCHAR(255) NOT NULL,
  name_bn VARCHAR(255),
  category VARCHAR(100), -- vegetables, fruits, dairy, eggs, rice
  quantity INT,
  unit VARCHAR(50),
  price_per_unit INT, -- BDT
  is_organic BOOLEAN DEFAULT FALSE,
  harvest_date DATE,
  available_until DATE,
  images TEXT[], -- Array of image URLs
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_products_farmer ON farmer_products(farmer_id);
CREATE INDEX idx_products_category ON farmer_products(category);
```

### 10. Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  farmer_id UUID NOT NULL REFERENCES farmers(id),
  product_id UUID NOT NULL REFERENCES farmer_products(id),
  quantity INT NOT NULL,
  total_amount INT, -- BDT
  order_status VARCHAR(100), -- 'pending', 'confirmed', 'delivered', 'cancelled'
  payment_method VARCHAR(50), -- 'bkash', 'nagad', 'cod'
  delivery_address TEXT,
  ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delivered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_farmer ON orders(farmer_id);
CREATE INDEX idx_orders_status ON orders(order_status);
```

---

## Views (For Optimization)

### User Dashboard Summary View

```sql
CREATE VIEW user_dashboard_summary AS
SELECT 
  u.id as user_id,
  COUNT(DISTINCT i.id) as inventory_count,
  COUNT(DISTINCT CASE WHEN i.expiration_date <= CURRENT_DATE + INTERVAL '3 days' THEN i.id END) as items_expiring_soon,
  SUM(i.cost_bdt) as total_inventory_value,
  COALESCE(SUM(fl.cost_bdt), 0) as weekly_spending
FROM users u
LEFT JOIN inventory_items i ON u.id = i.user_id
LEFT JOIN food_logs fl ON u.id = fl.user_id AND fl.log_date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY u.id;
```

---

## Data Migrations

### Seed Data

1. **Food Items** - 20+ bilingual food items
2. **Resources** - 20+ bilingual sustainability resources

See `shared/foodItems.ts` and `shared/resources.ts` for seed data.

---

## Future Considerations

1. **Real-time Updates:** Consider Redis for caching frequently accessed data
2. **Full-Text Search:** Implement PostgreSQL text search for resources and food items
3. **Time-Series Data:** Consider TimescaleDB extension for sensor readings
4. **Analytics:** Set up data warehouse for consumption analytics
5. **Notifications:** Create notification_logs table for alerts (expiring items, order updates)
6. **Reviews & Ratings:** Add reviews table for farmer products

---

## Connection Configuration

### Environment Variables Required

```env
DATABASE_URL=postgresql://user:password@localhost:5432/foodsense
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=20
```

### ORM/Query Builder Options

- **Prisma** (Recommended) - Type-safe ORM
- **TypeORM** - Decorator-based ORM
- **Knex.js** - Query builder
- **Raw SQL** - For complex queries

---

## Notes

- All timestamps use UTC (CURRENT_TIMESTAMP)
- All costs are in BDT (Bangladesh Taka)
- UUIDs are used for primary keys for security and distribution
- Soft deletes could be added for audit trails (add `deleted_at` column)
- Audit logging should track changes to critical tables

---

**Last Updated:** January 2024  
**Status:** Schema Ready for Implementation
