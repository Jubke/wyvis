class Package < ActiveRecord::Base
  include Transliterate
  validates :name, :short, :description, :url, presence: true
  has_many :implementations
end