-- EC Vault Seed Data
-- Note: All sample curriculum mappings are explicitly marked 'pending_verification'
-- and all initial study resources are marked as sample/demo resources.

insert into public.roles (name, description) values
  ('student', 'Standard undergraduate ECE student account'),
  ('admin', 'Platform administrator with full CMS, pricing, and user access'),
  ('editor', 'Curriculum and content editor')
on conflict (name) do nothing;

insert into public.semesters (year_number, semester_number, title, description) values
  (1, 1, 'Year 1 · Semester 1', 'Foundational Engineering Mathematics, Physics, Programming, and Basic Electrical'),
  (1, 2, 'Year 1 · Semester 2', 'Linear Algebra & Differential Equations, Basic Electronics, Mechanics, and Engineering Graphics'),
  (2, 3, 'Year 2 · Semester 3', 'Network Theory, Electronic Devices, Digital Electronics, and Signals & Systems'),
  (2, 4, 'Year 2 · Semester 4', 'Analog Circuits, Electromagnetic Theory, Probability & Random Processes, and Control Systems'),
  (3, 5, 'Year 3 · Semester 5', 'Analog & Digital Communication, DSP, Microprocessors, and Computer Networks'),
  (3, 6, 'Year 3 · Semester 6', 'VLSI Design, Information Theory & Coding, Antenna & RF Engineering, and Embedded Systems'),
  (4, 7, 'Year 4 · Semester 7', 'Advanced VLSI, Wireless 5G/6G, Image & Speech Processing, IoT, and ML for ECE'),
  (4, 8, 'Year 4 · Semester 8', 'Satellite & Radar Systems, FPGA Hardware Design, MEMS, Robotics, and Capstone Electives')
on conflict (semester_number) do nothing;

insert into public.universities (name, short_name, category, location, website_url) values
  ('Consolidated IIT-Level Master Curriculum', 'IIT-Master', 'Consolidated Master', 'Pan-India Reference', 'https://nptel.ac.in'),
  ('Indian Institute of Technology Bombay (Reference Mapping)', 'IITB', 'IIT', 'Mumbai', 'https://www.iitb.ac.in'),
  ('Indian Institute of Technology Madras (Reference Mapping)', 'IITM', 'IIT', 'Chennai', 'https://www.iitm.ac.in'),
  ('National Institute of Technology Tiruchirappalli (Reference Mapping)', 'NITT', 'NIT', 'Tiruchirappalli', 'https://www.nitt.edu'),
  ('Anna University / State Technical Universities (Reference Mapping)', 'State-ECE', 'State University', 'India', null)
on conflict (name) do nothing;

-- Sample Coupons
insert into public.coupons (code, description, discount_type, discount_value, min_order_inr, max_uses, is_active) values
  ('ECEWELCOME20', '20% off on any bundle or subject collection', 'percent', 20, 19, 1000, true),
  ('SEMESTER15', 'Flat ₹15 off on Semester or Year bundles', 'flat', 15, 99, 500, true)
on conflict (code) do nothing;

