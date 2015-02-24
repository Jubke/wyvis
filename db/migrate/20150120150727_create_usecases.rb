class CreateUsecases < ActiveRecord::Migration
  def change
    create_table :usecases do |t|
      t.string :name
      t.text :description
      t.string :author

      t.timestamps null: false
    end
  end
end
