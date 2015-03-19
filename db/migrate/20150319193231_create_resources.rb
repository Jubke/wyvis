class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :url, null: false
      t.sting :content_type
      t.belongs_to :library, null: false, index: true

      t.timestamps null: false
    end
  end
end
