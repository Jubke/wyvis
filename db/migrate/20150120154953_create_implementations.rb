class CreateImplementations < ActiveRecord::Migration
  def change
    create_table :implementations do |t|
      t.string :name
      t.string :author
      t.text :discription
      t.belongs_to :library, index: true
      t.belongs_to :usecase, index: true

      t.timestamps null: false
    end
  end
end
