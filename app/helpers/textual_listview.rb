TextualListview = Struct.new(:title, :headers, :col_order, :value) do
  def locals
    #here is the incoming data being null
    p "mels TextualListview title #{title}"
    p "mels TextualListview headers #{headers}"
    p "mels TextualListview col_order #{col_order}"
    p "mels TextualListview value #{value}"

    ## all these values equaling nil breaks our party

# "mels TextualListview title Variables"
# "mels TextualListview headers [\"Name\", \"Value\"]"
# "mels TextualListview col_order [\"name\", \"value\"]"
# "mels TextualListview value []"
    m = {
      :title     => title.nil? ? "" : title,
      :headers   => headers.nil? ? ["Name", "Value"] : headers,
      :colOrder  => col_order.nil? ? ["name", "value"] : col_order,
      :values    => value.nil? ? [] : value,
      :rowLabel  => _('View the table'),
      :component => 'TableListView',
    }
    p "mels m #{m}"
    m

    ##"mels m {:title=>\"Variables\", :headers=>[\"Name\", \"Value\"], :colOrder=>[\"name\", \"value\"], :values=>[], :rowLabel=>\"View the table\", :component=>\"TableListView\"}"
  end

  def self.new_from_hash(h)
    new(*h.values_at(*members))
  end

  def self.data(h)
    new_from_hash(h).locals
  end
end
