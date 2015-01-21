class Library < ActiveRecord::Base
  validates :name, :short, :discription, :url, presence: true
  has_many :implementations
end