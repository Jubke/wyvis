class Implementation < ActiveRecord::Base
  validates :name, :author, :discription, :library, presence: true

  belongs_to :usecase, dependent: :destroy
  belongs_to :library
end
