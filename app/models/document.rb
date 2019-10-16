class Document < ApplicationRecord
  belongs_to :user
  belongs_to :document_type
  has_many :document_pages
end
