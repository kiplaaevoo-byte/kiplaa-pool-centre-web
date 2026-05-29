CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255) NOT NULL,

    wallet_balance DECIMAL(12,2) DEFAULT 0,
    total_winnings DECIMAL(12,2) DEFAULT 0,

    matches_played INT DEFAULT 0,
    matches_won INT DEFAULT 0,
    rank_points INT DEFAULT 0,

    is_verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pool_tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    table_number INT NOT NULL,
    branch_name VARCHAR(100),

    status VARCHAR(20) DEFAULT 'available',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    player_one UUID REFERENCES users(id),
    player_two UUID REFERENCES users(id),

    table_id UUID REFERENCES pool_tables(id),

    stake_amount DECIMAL(12,2) NOT NULL,
    total_pool DECIMAL(12,2) NOT NULL,

    winner_id UUID REFERENCES users(id),

    platform_commission DECIMAL(12,2),
    winner_amount DECIMAL(12,2),

    status VARCHAR(20) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID REFERENCES users(id),

    transaction_type VARCHAR(50),
    amount DECIMAL(12,2),

    transaction_code VARCHAR(100),

    status VARCHAR(20) DEFAULT 'completed',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournaments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    title VARCHAR(150) NOT NULL,

    entry_fee DECIMAL(12,2),
    prize_pool DECIMAL(12,2),

    start_date TIMESTAMP,

    status VARCHAR(20) DEFAULT 'upcoming',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);