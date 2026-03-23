-- ============================================
-- SMART HOTEL - Supabase SQL Schema
-- Generated: 2026-03-23
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. ROOM TYPES
-- ============================================
CREATE TABLE room_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,           -- e.g. Standard, Deluxe, Suite
    description TEXT,
    max_occupancy INT NOT NULL DEFAULT 2,
    base_price NUMERIC(10, 2) NOT NULL,
    amenities TEXT[],                     -- e.g. ['WiFi', 'AC', 'TV']
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. ROOMS
-- ============================================
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_number VARCHAR(10) UNIQUE NOT NULL,
    floor INT NOT NULL,
    room_type_id UUID REFERENCES room_types(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance', 'reserved')),
    is_smoking BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. GUESTS
-- ============================================
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20),
    id_type VARCHAR(50),                  -- Passport, Aadhaar, etc.
    id_number VARCHAR(100),
    nationality VARCHAR(100),
    date_of_birth DATE,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. STAFF
-- ============================================
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL,            -- Receptionist, Housekeeping, Manager, etc.
    department VARCHAR(100),
    salary NUMERIC(10, 2),
    hired_at DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. BOOKINGS / RESERVATIONS
-- ============================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number VARCHAR(20) UNIQUE NOT NULL DEFAULT 'BK-' || UPPER(SUBSTR(uuid_generate_v4()::TEXT, 1, 8)),
    guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    num_adults INT DEFAULT 1,
    num_children INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
    special_requests TEXT,
    total_amount NUMERIC(10, 2),
    booked_by UUID REFERENCES staff(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_dates CHECK (check_out_date > check_in_date)
);

-- ============================================
-- 6. CHECK-IN / CHECK-OUT LOG
-- ============================================
CREATE TABLE checkin_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    action VARCHAR(20) CHECK (action IN ('check_in', 'check_out')),
    action_time TIMESTAMPTZ DEFAULT NOW(),
    handled_by UUID REFERENCES staff(id) ON DELETE SET NULL,
    remarks TEXT
);

-- ============================================
-- 7. PAYMENTS
-- ============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50) CHECK (payment_method IN ('cash', 'card', 'upi', 'bank_transfer', 'online')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    transaction_id VARCHAR(150),
    paid_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT
);

-- ============================================
-- 8. SERVICES (Hotel services like laundry, spa)
-- ============================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100),               -- Food, Spa, Laundry, Transport, etc.
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. SERVICE ORDERS (Guest service requests)
-- ============================================
CREATE TABLE service_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    quantity INT DEFAULT 1,
    total_price NUMERIC(10, 2),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    ordered_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    handled_by UUID REFERENCES staff(id) ON DELETE SET NULL,
    notes TEXT
);

-- ============================================
-- 10. HOUSEKEEPING
-- ============================================
CREATE TABLE housekeeping (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'done')),
    scheduled_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 11. FEEDBACK / REVIEWS
-- ============================================
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_bookings_guest ON bookings(guest_id);
CREATE INDEX idx_bookings_room ON bookings(room_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_service_orders_booking ON service_orders(booking_id);
CREATE INDEX idx_housekeeping_room ON housekeeping(room_id);

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Room Types
INSERT INTO room_types (name, description, max_occupancy, base_price, amenities) VALUES
('Standard', 'Comfortable standard room', 2, 1500.00, ARRAY['WiFi', 'AC', 'TV']),
('Deluxe', 'Spacious deluxe room with city view', 2, 2500.00, ARRAY['WiFi', 'AC', 'TV', 'Mini Bar']),
('Suite', 'Luxury suite with living area', 4, 5000.00, ARRAY['WiFi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi', 'Balcony']),
('Family Room', 'Large room for families', 5, 3500.00, ARRAY['WiFi', 'AC', 'TV', 'Extra Beds']);

-- Rooms
INSERT INTO rooms (room_number, floor, room_type_id, status) VALUES
('101', 1, (SELECT id FROM room_types WHERE name='Standard'), 'available'),
('102', 1, (SELECT id FROM room_types WHERE name='Standard'), 'available'),
('201', 2, (SELECT id FROM room_types WHERE name='Deluxe'), 'available'),
('202', 2, (SELECT id FROM room_types WHERE name='Deluxe'), 'maintenance'),
('301', 3, (SELECT id FROM room_types WHERE name='Suite'), 'available'),
('401', 4, (SELECT id FROM room_types WHERE name='Family Room'), 'available');

-- Services
INSERT INTO services (name, category, price, description) VALUES
('Room Service - Breakfast', 'Food', 250.00, 'Full breakfast delivered to room'),
('Room Service - Dinner', 'Food', 400.00, 'Dinner delivered to room'),
('Laundry - Per Kg', 'Laundry', 100.00, 'Laundry service per kg'),
('Spa - Full Body Massage', 'Spa', 1500.00, '60 minute full body massage'),
('Airport Pickup', 'Transport', 800.00, 'One-way airport pickup'),
('Extra Bed', 'Room', 500.00, 'Extra bed for the room');

-- ============================================
-- END OF SCHEMA
-- ============================================
