class Library < ActiveRecord::Base
  include Transliterate
  validates :name, :short, :description, :url, :cdn_url, presence: true
  has_many :implementations
end