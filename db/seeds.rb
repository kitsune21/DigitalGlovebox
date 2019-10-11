name = %w[Medical License Random Other]
type = ['Insurance', 'Registration', 'Service Record', 'Manual']
default = User.create(
  email: 'user@email.com',
  name: 'Will',
  password: 'password'
)

default_car = Car.create(
    year: Faker::Vehicle.year,
    make: Faker::Vehicle.make,
    model: Faker::Vehicle.model,
    mileage: Faker::Vehicle.mileage,
    vin: Faker::Vehicle.vin,
    color: Faker::Vehicle.color,
    license_plate: Faker::Vehicle.license_plate,
    user_id: default.id
  )
@type_ids = []
for i in (0..3) do
  dt = DocumentType.create(
    name: type[i],
    user_id: 1
  )
  @type_ids << dt.id
end

3.times do
  document = Document.create(
    name: Faker::Superhero.name,
    user_id: 1,
    document_type_id: @type_ids.sample
  )
end

30.times do
  user = User.create(
    email: Faker::Internet.email,
    name: Faker::Name.first_name,
    password: 'password',
  )
  vehicle = Car.create(
    year: Faker::Vehicle.year,
    make: Faker::Vehicle.make,
    model: Faker::Vehicle.model,
    mileage: Faker::Vehicle.mileage,
    vin: Faker::Vehicle.vin,
    color: Faker::Vehicle.color,
    license_plate: Faker::Vehicle.license_plate,
    user_id: user.id
  )
  document_type = DocumentType.create(
    name: name.sample,
    user_id: user.id
  )
  3.times do
    document = Document.create(
      name: Faker::Superhero.name,
      user_id: user.id,
      document_type_id: @type_ids.sample
    )
  end
end


puts 'Data Seeded'
