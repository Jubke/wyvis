class Resource < ActiveRecord::Base
  validates :url, presence: true
  belongs_to :library, inverse_of: :resources
end
