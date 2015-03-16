class AddShortToLibraries < ActiveRecord::Migration
  def change
    add_column :packages, :short, :text
  end
end
