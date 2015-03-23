class Library < ActiveRecord::Base
  include Transliterate
  serialize :meta_tags
  serialize :render_tech

  validates :name, :url, presence: true
  
  has_many :implementations, inverse_of: :library
  has_many :resources, inverse_of: :library
  has_and_belongs_to_many :visualization_types
  has_and_belongs_to_many :visualization_tasks
end