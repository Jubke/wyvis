class DataType < ActiveRecord::Base
  has_and_belongs_to_many :visualization_types
end
