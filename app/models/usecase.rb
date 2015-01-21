class Usecase < ActiveRecord::Base
  validates :name, :discription, :short, presence: true

  has_many :implementations
  has_many :libraries, through: :implementations
end
