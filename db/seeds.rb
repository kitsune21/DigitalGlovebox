
name = %w[Insurance Manual License other]

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
  document_type = DocumentType.create(
    name: name.sample,
    user_id: user.id
  )
  Document.create(
    name: Faker::Superhero.name,
    user_id: user.id,
    document_type_id: document_type.id
  )
end


puts 'Data Seeded'
