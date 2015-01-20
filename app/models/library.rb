class Library < ActiveRecord::Base
  validates :name, :discription, :url, presence: true
  has_many :implementations
end
