class Library < ActiveRecord::Base
  include Transliterate
  serialize :meta_tags

  validates :name, :url, presence: true
  
  has_many :implementations
  has_many :resources
  has_and_belongs_to_many :visualization_types
  has_and_belongs_to_many :visualization_tasks
end