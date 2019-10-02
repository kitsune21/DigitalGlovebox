class CreateCars < ActiveRecord::Migration[6.0]
  def change
    create_table :cars do |t|
      t.string :year
      t.string :make
      t.string :model
      t.integer :mileage
      t.string :vin
      t.string :color
      t.string :license_plate
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
