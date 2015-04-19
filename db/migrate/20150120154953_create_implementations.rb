class CreateImplementations < ActiveRecord::Migration
  def change
    create_table :implementations do |t|
      t.string :name
      t.text :description
      t.float :execution_time
      t.integer :execution_count
      t.float :update_time
      t.integer :update_count
      t.belongs_to :library, index: true
      t.belongs_to :scenario, index: true

      t.timestamps null: false
    end
  end
end
