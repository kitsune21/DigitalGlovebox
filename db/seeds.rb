
name = ['Vehicle']

30.times do
  user = User.create(
    email: Faker::Internet.email,
    first_name: Faker::Name.first_name,
    password: 'password',
  )
  Vehicle = Vehicle.create(
    year: Faker::Vehicle.year
    make: Faker::Vehicle.make
    model: Faker::Vehicle.model
    mileage: Faker::Vehicle.mileage
    vin: Faker::Vehicle.vin
    color: Faker::Vehicle.color
    license_plate: Faker::vehicle.license_plate
    user_id: user.id 
  )

end

user = User.create(
  email: test.test@tester.com,
  first_name: Faker::Name.first_name,
  password: 'password',
)
end

puts 'Data Seeded'
