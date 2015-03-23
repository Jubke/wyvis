class CreateVisualizationTypes < ActiveRecord::Migration
  def change
    create_table :visualization_types do |t|
      t.string :name
      t.string :wiki_url
      t.string :image_url
      t.text :description

      t.timestamps null: false
    end
  end
end
