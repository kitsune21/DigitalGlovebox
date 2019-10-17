class Document < ApplicationRecord
  belongs_to :user
  has_one :document_type
  has_many :document_pages
end
