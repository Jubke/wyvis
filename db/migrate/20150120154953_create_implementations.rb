class CreateImplementations < ActiveRecord::Migration
  def change
    create_table :implementations do |t|
      t.string :name
      t.string :author
      t.text :description
      t.belongs_to :library, index: true
      t.belongs_to :scenario, index: true

      t.timestamps null: false
    end
  end
end
