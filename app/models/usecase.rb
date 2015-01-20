class Usecase < ActiveRecord::Base
  validates :name, :discription, :author, presence: true

  has_many :implementations
  has_many :libraries, through: :implementations
end
