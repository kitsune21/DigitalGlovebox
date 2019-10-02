class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :document_type, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
