class CreatePackages < ActiveRecord::Migration
  def change
    create_table :packages do |t|
      t.string :name
      t.string :url
      t.text :description
      t.string :version

      t.timestamps null: false
    end
  end
end
