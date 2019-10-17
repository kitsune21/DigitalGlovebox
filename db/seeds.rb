@name = %w[Medical License Random Other]
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
  @type_ids = []
  for i in (0..3) do
    dt = DocumentType.create(
      name: @type[i],
      user_id: default.id
    )
    @type_ids << dt.id
  end

  3.times do
    document = Document.create(
      name: Faker::Superhero.name,
      user_id: default.id,
      document_type_id: @type_ids.sample
    )
    document_page = DocumentPage.create(
      document_id: document.id,
      front_img: @doc_pages.sample
    )
  end
end

def generate_standard_users
  5.times do
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
    3.times do
      document = Document.create(
        name: Faker::Superhero.name,
        user_id: user.id,
        document_type_id: @type_ids.sample
      )
      3.times do
        document_page = DocumentPage.create(
          document_id: document.id,
          front_img: @doc_pages.sample
        )
      end
    end

    3.times do
      document_type = DocumentType.create(
      name:Faker::Hipster.word + "(Custom Doc Type)",
      user_id: user.id
    )
      3.times do
        document = Document.create(
          name: Faker::Superhero.name,
          user_id: user.id,
          document_type_id: document_type.id
        )
        document_page = DocumentPage.create(
          document_id: document.id,
          front_img: @doc_pages.sample
        )
      end
    end
  end
end


generate_default_user_info
generate_standard_users

puts 'Data Seeded'
