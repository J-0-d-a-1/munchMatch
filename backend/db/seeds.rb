# db/seeds.rb

# Use transaction to ensure that if any operation fails,
#  the entire seed process is rolled back.
ActiveRecord::Base.transaction do
  # Create categories
  comfort = Category.find_or_create_by!(name: 'Comfort')
  indian = Category.find_or_create_by!(name: 'Indian')
  japanese = Category.find_or_create_by!(name: 'Japanese')
  mexican = Category.find_or_create_by!(name: 'Mexican')

  # Create users (only creating if email is unique)
  bob = User.find_or_create_by!(email: 'bob@bob.com') do |user|
    user.name = 'Bob'
    user.password = 'password'
    user.is_owner = false
  end

  alice = User.find_or_create_by!(email: 'alice@wonderland.com') do |user|
    user.name = 'Alice'
    user.password = 'password'
    user.is_owner = false
  end

  sam = User.find_or_create_by!(email: 'sam@fisher.com') do |user|
    user.name = 'Sam'
    user.password = 'password'
    user.is_owner = true
  end

  # Create restaurant and attach logo
  logo_path = Rails.root.join('app', 'assets', 'images', 'mexican1-logo.webp')
  restaurant = Restaurant.find_or_create_by!(name: 'Taquitos Paradise') do |r|
    r.user = sam
    r.category = mexican
    r.description = 'All your Mexican favorites in one place'
    r.location = '700 Imagination ave, Vancouver, BC, Canada, V5E0A4'
    if File.exist?(logo_path)
      r.logo.attach(
        io: File.open(logo_path),
        filename: 'mexican1-logo.webp',
        content_type: 'image/webp'
      )
    else
      puts "Logo file not found: #{logo_path}"
    end
  end

  # Attach logo to restaurant if it was found and not already attached
  if File.exist?(logo_path) && !restaurant.logo.attached?
    restaurant.logo.attach(
      io: File.open(logo_path),
      filename: 'mexican1-logo.webp',
      content_type: 'image/webp'
    )
  end

  # Create a dish and attach photo
  photo_path = Rails.root.join('app', 'assets', 'images', 'nachos.jpeg')
  dish = Dish.find_or_create_by!(name: 'Nachos', restaurant: restaurant) do |d|
    d.description = 'Corn chips with beans and pico de gallo sauce'
    d.price_in_cents = 1300
    if File.exist?(photo_path)
      d.photo.attach(
        io: File.open(photo_path),
        filename: 'nachos.jpeg',
        content_type: 'image/jpeg'
      )
    else
      puts "Photo file not found: #{photo_path}"
    end
  end

  # Attach photo to dish
  if File.exist?(photo_path) && !dish.photo.attached?
    dish.photo.attach(
      io: File.open(photo_path),
      filename: 'nachos.jpeg',
      content_type: 'image/jpeg'
    )
  end

  puts 'Database successfully seeded!'
end
