class AddShortToLibraries < ActiveRecord::Migration
  def change
    add_column :libraries, :short, :text
  end
end
