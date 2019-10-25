@name = ['Insurance Card', 'Auto Registration', 'Service Records', 'Manual']
@type = ['Insurance', 'Registration', 'Service Record', 'Manual']
@doc_pages = ['https://bit.ly/2MkWYpj', 'https://bit.ly/33GZ5Kd', 'https://bit.ly/2ITE72u']

def generate_default_user_info
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
  @type.length.times do |i|
    doc_type = DocumentType.create(
      name: @type[i],
      user_id: default.id
    )
    Document.create(
      name: @name[i],
      document_type_id: doc_type.id,
      user_id: default.id
    )
  end
end


generate_default_user_info

puts 'Data Seeded'
