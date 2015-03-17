class CreateLibraries < ActiveRecord::Migration
  def change
    create_table :libraries do |t|
      t.string :name
      t.string :url
      t.text :description
      t.string :version

      t.timestamps null: false
    end
  end
end
