<?php
/**
 * @copyright 2020
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Documentation;


/**
 * Class NodeFormatter
 *
 * Format a collected note suitable for documentation display.
 *
 */
class NodeFormatter
{
    const UNKNOWN = '<unknown>';

    public function formatNodes(array $nodes): array
    {
        return array_map([&$this, 'formatNode'], $nodes);
    }

    public function formatNode(object $node): DocumentedNode
    {
        $type = $this->getNodeType($node);
        $name = $this->getNodeName($node);

        return new DocumentedNode($type, $name);
    }

    /**
     * @param object $node
     * @return string
     */
    private function getNodeType(object $node): string
    {
        $type = self::UNKNOWN;

        if (property_exists($node, 'type')) {
            $type = $node->type;
        }

        return $type;
    }

    /**
     * @param object $node
     * @return string
     */
    private function getNodeName(object $node): string
    {
        $name = $node->name;

        if (is_null($name)) {
            $name = self::UNKNOWN;
        }

        return $name;
    }
}
