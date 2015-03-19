class VisualizationType < ActiveRecord::Base
  validates :name, presence: true
  has_and_belongs_to_many :data_types
  has_and_belongs_to_many :libraries
end
