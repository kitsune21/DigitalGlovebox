class CreateDocumentPages < ActiveRecord::Migration[6.0]
  def change
    create_table :document_pages do |t|
      t.belongs_to :document, null: false, foreign_key: true
      t.string :front_img
      t.string :back_img

      t.timestamps
    end
  end
end
