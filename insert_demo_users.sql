-- Insert demo users
INSERT INTO [User] (id, name, email, image, createdAt, updatedAt) VALUES
('1', 'Demo User', 'demo@prysm.com', NULL, GETUTCDATE(), GETUTCDATE()),
('2', 'Admin User', 'admin@prysm.com', NULL, GETUTCDATE(), GETUTCDATE()),
('3', 'LAD Admin', 'LAD@admin.com', NULL, GETUTCDATE(), GETUTCDATE());

-- Test login with:
-- Email: demo@prysm.com
-- Password: demo123
