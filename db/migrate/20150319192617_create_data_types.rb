class CreateDataTypes < ActiveRecord::Migration
  def change
    create_table :data_types do |t|
      t.string :name, index: true, null: false

      t.timestamps null: false
    end
  end
end
