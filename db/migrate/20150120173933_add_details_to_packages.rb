class AddDetailsToLibraries < ActiveRecord::Migration
  def change
    add_column :packages, :web_standard, :boolean
    add_column :packages, :latest_version, :string
    add_column :packages, :license, :string
    add_column :packages, :support, :text
  end
end
