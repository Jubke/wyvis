class CreateLibraries < ActiveRecord::Migration
  def change
    create_table :libraries do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.string :current_version
      t.string :image_url
      t.text :short
      t.boolean :web_standard
      t.string :render_tech
      t.string :dependencies
      t.string :license
      t.string :support
      t.integer :first_release
      t.integer :latest_release
      t.string :meta_tags
      t.text :description

      t.timestamps null: false
    end
  end
end
