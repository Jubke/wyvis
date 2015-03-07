class Library < ActiveRecord::Base
  validates :name, :short, :description, :url, :cdn_url, presence: true
  has_many :implementations
end